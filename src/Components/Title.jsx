import "./Title.scss";

const Title = ({ onReset }) => {
  return (
    <section id="Title">
    <div className="titleAndDesc">
        <h1 onClick={onReset} className="title-h1">
          Movie Explorer
          </h1>
        <p className="Desc">Découvrez des milliers de films instantanément</p>
    </div>
    </section>
  )
}

export default Title