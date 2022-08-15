function HistoryBar({ doc }) {
  return (
    <div style={{ marginTop: "auto", display: "flex" }}>
      {doc &&
        doc.history &&
        doc.history.map(() => {
          return <div>HI</div>
        })}
    </div>
  )
}
export default HistoryBar
