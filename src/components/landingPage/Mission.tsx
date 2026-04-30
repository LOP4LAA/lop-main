import pattern from "../../assets/pngs/pattern.png"

const Mission = () =>{
    return (
        <div
        style={{ backgroundImage: `url(${pattern})` }}
        className="w-full bg-cover grid place-content-center px-5 py-8 lg:py-12 xl:py-16"
      >
       <div className="w-full grid gap-8 max-w-xl text-lg md:text-xl text-center">
        <h3 className="text-center text-primary_100 ">The library of perspectives begins its exploration at the site of the wound, the space in which the strongholds of oppression are rooted — the mind. We believe that if oppression can be planted, liberatory practices, cultivated and nurtured, can take root.</h3>
        <div style={{lineHeight: 0}}>
            <h5 className="text-center text-sm  md:text-lg text-primary_100">Omolara and Oluwatobiloba</h5>
            <h5 className="text-center text-sm md:text-lg text-primary_100">Co-dreamers, Liberation Alliance Africa.</h5>
        </div>
        </div>
      </div>
    )
}

export default Mission