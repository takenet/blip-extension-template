export function tableSourceCode(
  items: Record<string, unknown>[],
  columns: unknown,
) {
  return `
#set text(size: 12pt, lang: "pt", font: "Liberation Sans");
#let data = json.decode("${JSON.stringify(items).replace(/"/g, '\\"').replace(/\\n/g, '\\\\n')}")
#let columns = json.decode("${JSON.stringify(columns).replace(/"/g, '\\"').replace(/\\n/g, '\\\\n')}")

#let a4 = (
  width: 595.35,
  height: 841.995,
)

#let width = columns.fold(
  0,
  (acc, c) => acc + c.at("width", default: 100),
)

#let flipped = width > a4.width and width <= a4.height

#set page(
  margin: 10pt,
  flipped: flipped,
  width: if flipped { a4.width * 1pt } else { calc.max(width, a4.width) * 1pt }
)


#let headers = columns.map(
  (c) => text(
    c.at("headerName", default: c.field),
    weight: 700
  )
)

#let cells = data.map(
  (item) => columns.map(
    (c) => block(
      text(item.at(c.field)),
      breakable: true,
    )
  )
).flatten()

#table(
  stroke: none,
  columns: columns.map(
    (c) => if (c.keys().contains("width")) {
      c.width * 1pt
    } else {
      1fr
    }
  ),
  inset: 10pt,
  align: horizon,
  ..headers,
  ..cells
)
`;
}
