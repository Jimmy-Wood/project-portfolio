export default function Summary(props) {
    const { lifeExpectancy, birthDate } = props
    const finalYear = parseInt(birthDate.split('-')[0]) + lifeExpectancy
    return (
    <section id="summary">
      <div>
        <p className="text-gradient">
          <i className="fa-solid fa-heart-crack" /> You are expected to live until the year <strong>{finalYear}</strong> with an age of <strong>{lifeExpectancy}</strong>. Make the most of it!
        </p>
      </div>
    </section>
  )
}
