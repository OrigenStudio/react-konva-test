// @flow
import * as React from "react"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"
import Konva from "konva"
import { Stage, Layer } from "react-konva"
import ReactResizeDetector from "react-resize-detector"
import TransformerComponent from "./TransformerComponent"
import RectangleWithText from "./RectangleWithText"

const styles = () => ({
  gridItemWrapper: {
    width: "100%",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  canvasWrapper: {
    width: "100%",
    flexGrow: "1",
    position: "relative",
  },
  shapesWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "grey",
  },
})

export class KonvaTest extends React.Component {
  state = {
    canvasSize: { width: null, height: null },
    selectedShapeName: null,
    shapes: [
      {
        x: 10,
        y: 10,
        width: 100,
        height: 20,
        rectFill: "blue",
        name: "shape1",
        text: "Shape 1",
        scaleX: 1,
        scaleY: 1,
      },
      {
        x: 20,
        y: 20,
        width: 100,
        height: 20,
        rectFill: "green",
        name: "shape2",
        text: "Shape 2",
        scaleX: 1,
        scaleY: 1,
      },
    ],
  }

  setCanvasSize = ({ width, height }) =>
    this.setState({ canvasSize: { width, height } })

  dragBound = (pos, elementSize) => {
    const { canvasSize } = this.state
    return {
      x:
        // eslint-disable-next-line no-nested-ternary
        pos.x <= 1
          ? 1
          : pos.x + elementSize.width > canvasSize.width
          ? canvasSize.width - elementSize.width
          : pos.x,
      y:
        // eslint-disable-next-line no-nested-ternary
        pos.y <= 1
          ? 1
          : pos.y + elementSize.height > canvasSize.height
          ? canvasSize.height - elementSize.height
          : pos.y,
    }
  }

  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: "",
      })
      return
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer"
    if (clickedOnTransformer) {
      return
    }

    // find clicked field by its name
    // const name = e.target.name(); // not working check if this is valid for groups or only for shapes.
    const name = e.target.parent.attrs.name // TODO Improve validation
    const field = this.state.shapes.find(r => r.name === name)
    if (field) {
      this.setState({
        selectedShapeName: name,
      })
    } else {
      this.setState({
        selectedShapeName: "",
      })
    }
  }

  addField = () => {
    const { shapes } = this.state

    shapes.push({
      x: 20,
      y: 20,
      width: 100,
      height: 20,
      rectFill: "green",
      name: `shape${shapes.length + 1}`,
      text: `Shape ${shapes.length + 1}`,
    })
    this.setState({ shapes })
  }

  onDragEnd = e => {
    const { shapes } = this.state
    console.log("====================================")
    console.log(e)
    console.log("====================================")
    this.setState({
      shapes: [
        ...shapes.map(field => {
          if (field.name === e.target.attrs.name) {
            return {
              ...field,
              x: e.target.attrs.x,
              y: e.target.attrs.y,
            }
          }
          return field
        }),
      ],
    })
  }

  onTransformEnd = e => {
    const { shapes } = this.state
    console.log("====================================")
    console.log(e)
    console.log("====================================")
    this.setState({
      shapes: [
        ...shapes.map(field => {
          if (field.name === e.target.attrs.name) {
            return {
              ...field,
              x: e.target.attrs.x,
              y: e.target.attrs.y,
              width: field.width * e.target.attrs.scaleX,
              height: field.height * e.target.attrs.scaleY,
              scaleX: 1,
              scaleY: 1,
            }
          }
          return field
        }),
      ],
    })
  }

  render() {
    const { selectedShapeName, shapes } = this.state
    const { classes } = this.props
    console.log("====================================")
    console.log("state at render", this.state)
    console.log("====================================")
    return (
      <Grid container>
        <Grid item xs={12} className={classes.gridItemWrapper}>
          <div className={classes.canvasWrapper}>
            <ReactResizeDetector
              handleHeight
              handleWidth
              onResize={this.setCanvasSize}
            >
              {({ height, width }) => (
                <Stage
                  width={width}
                  height={height}
                  className={classes.shapesWrapper}
                  onMouseDown={this.handleStageMouseDown}
                >
                  <Layer>
                    {shapes.map((shape, i) => (
                      <RectangleWithText
                        {...shape}
                        key={shape.name}
                        dragBoundFunc={pos =>
                          this.dragBound(pos, {
                            width: shape.width,
                            height: shape.height,
                          })
                        }
                        onDragEnd={this.onDragEnd}
                        onTransformEnd={this.onTransformEnd}
                      />
                    ))}
                    <TransformerComponent
                      selectedShapeName={selectedShapeName}
                    />
                  </Layer>
                </Stage>
              )}
            </ReactResizeDetector>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(KonvaTest)
