import React,{Component} from 'react'
import { Grid } from '@material-ui/core'
import { Col, Row } from 'reactstrap'
import CircularProgress from '@material-ui/core/CircularProgress'

class Loading extends Component{
  render(){
  if (this.props.error) {
    return (<Grid>
      <Row center = "xs">
      <p> Please reload the page.. </p>
      </Row>
      </Grid>)
  } else if (this.props.timedOut) {
    return (<div>
      <Grid fluid className="RefreshIndicator" key={1}>
      <Row center="xs">
      <Col xs>
        <CircularProgress
           size={50}
           left={45}
           top={0}
           loadingColor="#FF9800"
           status="loading"
           className="refresh"
          />
      </Col>
      </Row>
      <Row center="xs">
      <p>Loading CodeEditor might take a while.. Please hold on..</p>
      </Row>
      </Grid>
      <br />
      </div>)
  } else if (this.props.pastDelay) {
    return (<Grid fluid className="RefreshIndicator" key={1}>
    <Row center="xs">
    <Col xs>
      <CircularProgress
         size={50}
         left={45}
         top={0}
         loadingColor="#FF9800"
         status="loading"
         className="refresh"
        />
    </Col>
    </Row>
    </Grid>)
  } else {
    return null
  }
 }
}

export default Loading
