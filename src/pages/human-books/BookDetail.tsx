import { Button } from "@/components/core/Button/Button"
import { RenderIf } from "@/components/hoc/RenderIf/RenderIf"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast, { LoaderIcon } from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { z } from "zod"
import { db } from "../../../firebase"
import { booksServices } from "../../services/booksServices"
import { GenericError } from "../../types"
import { IndividualBook } from "../../types/books"

interface Chapter {
  timestamp: string
  title: string
}

interface Message {
  id: string
  avatar?: string
  name?: string
  message: string
  timestamp: { seconds: number; nanoseconds: number } // Firebase timestamp
}

const parseVideoChapters = (chaptersString: string): Chapter[] => {
  try {
    const fixedJsonString = chaptersString.replace(/"(\d+:\d+)",\s*"([^"]+)"/g, '"$1": "$2"')
    const chapters = JSON.parse(fixedJsonString)
    return Object.entries(chapters).map(([timestamp, title]) => ({
      timestamp,
      title: title as string,
    }))
  } catch (error) {
    console.error("Error parsing video chapters:", error)
    return []
  }
}

function Sidebar({
  modules,
  activeModuleId,
  setActiveModuleId,
  bookId,
  isEnrolled,
}: {
  modules: IndividualBook["modules"]
  activeModuleId: string
  setActiveModuleId: React.Dispatch<React.SetStateAction<string>>
  bookId: string
  isEnrolled: boolean
}) {
  const [isOpen, setIsOpen] = useState(true)
  const queryClient = useQueryClient()

  const toggleAccordion = () => setIsOpen(!isOpen)
  const toggleModule = (id: string) => setActiveModuleId(id)

  const { mutate: enrollBook, status: enrollingBook } = useMutation({
    mutationFn: () => booksServices.enrollBook(bookId),
    onSuccess: () => {
      toast.success("Book enrolled successfully")
      queryClient.invalidateQueries({ queryKey: ["book", bookId] })
    },
    onError: (error: GenericError) => {
      toast.error(error.response.data.message)
    },
    onSettled: () => {},
  })

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center mb-6 cursor-pointer" onClick={toggleAccordion}>
        <img
          src="/assets/chevron-down.svg"
          alt="open/close menu"
          className={`w-4 h-4 transform ${isOpen ? "rotate-180" : ""} transition-transform`}
        />
        <h1 className="text-base font-medium text-primary_100 ml-5">Contents</h1>
      </div>

      {isOpen && (
        <div className="space-y-4">
          <RenderIf condition={!isEnrolled}>
            <Button
              onClick={() => enrollBook()}
              disabled={enrollingBook === "pending"}
              theme="primary"
              size="40"
              className="w-full"
            >
              Enroll
            </Button>
          </RenderIf>

          <div>
            <h1 className="mb-2 text-sm text-primary font-custom font-semibold">Modules</h1>
            {modules?.map((module) => (
              <div key={module.id}>
                <button
                  className={`w-full h-10 text-base font-light flex items-center justify-start rounded-lg p-4 cursor-pointer ${
                    module.id === activeModuleId ? "bg-secondary text-white" : "bg-transparent text-primary_100"
                  }`}
                  onClick={() => toggleModule(module.id)}
                >
                  <h2 className="text-xl text-center">{module.name}</h2>
                </button>
                <div className="mt-6">
                  {activeModuleId === module.id &&
                    parseVideoChapters(module.video_chapters).map((chapter, chapterIndex) => (
                      <div key={chapterIndex} className="flex items-start pl-7">
                        <img src="/assets/menu.svg" alt="menu" width={19} height={14} className="mt-1" />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-primary_100">{chapter.title}</h3>
                          <p className="text-[0.625rem] font-light text-primary_100">{chapter.timestamp}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const messageSchema = z.object({
  message: z.string().min(1, "Please enter a message"),
})

const BookDetail = () => {
  const { bookId = "" } = useParams()
  const [activeModuleId, setActiveModuleId] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const queryClient = useQueryClient()

  const profile = JSON.parse(localStorage.getItem("profile") ?? "")
  const userName = `${profile?.first_name} ${profile?.last_name}`

  const { data, status } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => booksServices.fetchBook(bookId),
  })

  const book = data?.data

  console.log("single book details>>", book)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  })

  const { mutate: sendMessage, status: sendingMessage } = useMutation({
    mutationFn: async (data: { message: string }) => {
      await addDoc(collection(db, "forum", selectedChatRoom, "messages"), {
        message: data.message,
        timestamp: new Date(), // Use current time for timestamp
        name: userName, // Replace with actual sender's name or user ID
        avatar: profile?.avatar ?? "https://github.com/shadcn.png", // Replace with actual avatar URL if available
      })
    },
    onSuccess: () => {
      toast.success("Sent message successfully")
      reset({
        message: "",
      })
      queryClient.invalidateQueries({ queryKey: ["book", bookId] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: markAsCompleted, status: markAsCompletedStatus } = useMutation({
    mutationFn: booksServices.markAsCompleted,
    onSuccess: (response) => {
      toast.success(response?.data?.message)
      queryClient.invalidateQueries({ queryKey: ["book", bookId] })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    },
  })

  const handleMarkAsCompleted = (data: { book_id: string; module_id: string }) => {
    markAsCompleted({ book_id: data.book_id, module_id: data.module_id })
  }
  const selectedChatRoom = book ? `${book.name}-${bookId}` : ""

  useEffect(() => {
    if (!selectedChatRoom) return

    const q = query(collection(db, "forum", selectedChatRoom, "messages")) // Update path as needed
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[]

      const sortedMessages = newMessages.sort((a, b) => {
        const aTimestamp = a.timestamp.seconds * 1000 + a.timestamp.nanoseconds / 1000000
        const bTimestamp = b.timestamp.seconds * 1000 + b.timestamp.nanoseconds / 1000000
        return bTimestamp - aTimestamp
      })

      setMessages(sortedMessages)
    })

    // Clean up listener on unmount
    return () => unsubscribe()
  }, [selectedChatRoom])

  const onSendMessage = async (data: { message: string }) => {
    sendMessage(data)
  }

  if (book && book.modules && book.modules.length > 0 && !activeModuleId) {
    setActiveModuleId(book.modules[0].id)
  }

  const activeModuleIndex =
    book && book.modules ? book.modules.findIndex((module) => module.id === activeModuleId) || 0 : 0

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderIcon className="w-4 h-4" />
      </div>
    )
  }

  return (
    <div className="mt-12 flex items-start gap-7 w-full">
      <div className="mt-[72px] grow">
        <Sidebar
          modules={book?.modules as IndividualBook["modules"]}
          activeModuleId={activeModuleId}
          setActiveModuleId={setActiveModuleId}
          bookId={bookId}
          isEnrolled={book?.is_enrolled ?? false}
        />
      </div>
      <div className="w-2/3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/human-books?tab=all-books">
              <img src="/assets/home.svg" alt="home" width={18} height={18} />
            </Link>
            <img src="/assets/chevron-right.svg" alt="" width={24} height={24} />
            <p className="text-sm font-light text-primary_100">{book?.name}</p>
            <img src="/assets/chevron-right.svg" alt="" width={24} height={24} />
            <p className="text-sm font-light text-primary_100">Module {activeModuleIndex + 1}</p>
          </div>

          {/* <button className="flex items-center gap-2 h-10 bg-secondary text-white text-sm font-normal pl-9 pr-6 rounded-lg">
            <img src="/assets/share.svg" alt="share" width={18} height={18} />
            <span>Share Human Book</span>
          </button> */}
        </div>

        <div className="mt-5">
          <p className="font-custom text-2xl text-primary_100">{book?.name}</p>
          <p className="mt-3 text-xl font-medium text-primary_100">
            Module {activeModuleIndex + 1} - {book?.modules[activeModuleIndex]?.name}
          </p>

          <iframe
            src={book?.modules[activeModuleIndex]?.preview}
            className="mt-2.5 aspect-video"
            style={{ border: "none" }}
            width="100%"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>

          <div className="mt-5  flex justify-between">
            <TabGroup className="w-full">
              <div className="flex w-full items-center justify-between">
                <TabList className="flex items-center gap-14 border-b border-[#B8B8D2]">
                  <Tab className="border-b-4 border-transparent data-[selected]:border-secondary_1 text-sm font-normal text-primary_100 pb-1.5 -mb-0.5 px-2">
                    Transcript
                  </Tab>
                  <Tab className="border-b-4 border-transparent data-[selected]:border-secondary_1 text-sm font-normal text-primary_100 pb-1.5 -mb-0.5 px-2">
                    Details
                  </Tab>
                  <Tab className="border-b-4 border-transparent data-[selected]:border-secondary_1 text-sm font-normal text-primary_100 pb-1.5 -mb-0.5 px-2">
                    Community
                  </Tab>
                </TabList>
                <RenderIf
                  condition={book ? book?.is_enrolled && !book?.modules[activeModuleIndex]?.is_enrolled : false}
                >
                  <Button
                    theme="secondary"
                    className="justify-self-end"
                    size="40"
                    loading={markAsCompletedStatus === "pending"}
                    onClick={() =>
                      handleMarkAsCompleted({
                        book_id: bookId ?? "",
                        module_id: book?.modules[activeModuleIndex].id ?? "",
                      })
                    }
                  >
                    Mark as completed
                  </Button>
                </RenderIf>
              </div>

              <TabPanels>
                <TabPanel>
                  <div
                    className="mt-3"
                    dangerouslySetInnerHTML={{
                      __html: book?.modules[activeModuleIndex]?.video_transcription || "",
                    }}
                  />
                </TabPanel>
                <TabPanel className="mt-9">
                  <p className="text-xl text-primary_100 font-medium">{book?.name}</p>
                  <div className="mt-7 space-y-7">
                    {/* TODO: Add the language to the book response object */}
                    {/* <div className="flex items-center gap-2">
                      <img src="/assets/volume.svg" alt="" width={14} height={14} />
                      <p className="text-xs text-primary">English, Yoruba</p>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <img src="/assets/collection.svg" alt="" width={14} height={14} />
                      <p className="text-xs text-primary">
                        {book?.modules?.length} {book?.modules?.length === 1 ? "Module" : "Modules"} (
                        {book?.modules[activeModuleIndex]?.duration})
                      </p>
                    </div>
                  </div>

                  <div className="mt-9">
                    <p className="text-sm text-primary_100 font-medium">Description</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: book?.description ?? "",
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel className="mt-8">
                  <p className="text-sm text-primary_100 font-medium">Say Hello!</p>
                  <br />
                  <p className="text-sm text-primary_100 font-medium">We would love to hear from you.</p>
                  <br />
                  <p className="text-sm text-primary_100 font-medium">
                    Share your favorite quotes from *{book?.name}'s book
                  </p>
                  <label htmlFor="message" className="flex">
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          id="message"
                          {...field}
                          className={`w-full outline-none ring-1 ring-grey_2 focus:ring-primary_100 p-3 text-xs text-primary_100 rounded min-h-16 ${errors.message ? "border-red-500" : ""}`}
                          placeholder="Write your message here..."
                        />
                      )}
                    />
                  </label>
                  <br />
                  <p className="text-sm text-primary_100 font-medium">
                    Share with us the name of a song that reflects your experience of *Sibongile’s book that we can add
                    to our collective playlist{" "}
                  </p>
                  <label htmlFor="message" className="flex">
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          id="message"
                          {...field}
                          className={`w-full outline-none ring-1 ring-grey_2 focus:ring-primary_100 p-3 text-xs text-primary_100 rounded min-h-16 ${errors.message ? "border-red-500" : ""}`}
                          placeholder="Write your message here..."
                        />
                      )}
                    />
                  </label>
                  {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                  <button
                    onClick={handleSubmit(onSendMessage)}
                    disabled={sendingMessage === "pending"}
                    className="mt-2 flex items-center justify-center h-6 px-4 bg-primary_100 text-white text-xs rounded disabled:bg-primary_100/50"
                  >
                    Post
                  </button>

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="mt-4 pt-8 pr-12 pb-3.5 pl-6 border border-grey_2 rounded-2xl flex items-start gap-5"
                    >
                      <img
                        src={message.avatar || "/assets/avatar.png"}
                        alt="avatar"
                        width={42}
                        height={42}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-primary_100">{message.name}</p>
                        <p className="text-xs font-normal text-primary_100">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
