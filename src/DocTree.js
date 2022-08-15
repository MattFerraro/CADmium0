import planeSVG from "./svgs/plane_min.svg"

const iconWidth = 25

function DocTree({ doc }) {
  return (
    <div style={{ borderBottom: "1px solid black", width: "100%" }}>
      {doc.default &&
        doc.default.planes.map((plane, idx) => {
          return (
            <div style={{ display: "flex" }} key={idx}>
              <img
                src={planeSVG}
                alt="plane"
                height={iconWidth}
                width={iconWidth}
              />{" "}
              {plane.name}
            </div>
          )
        })}
    </div>
  )
}

export default DocTree
