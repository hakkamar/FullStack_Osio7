import React from 'react'
import { Icon, List, Segment } from 'semantic-ui-react'

class Juuseri extends React.Component {
  render () {
    const { juuseri } = this.props

    if (juuseri === undefined) {
      return(<div>päivitetään sivu, malta hetki....</div>)
    }

    return(
      <div>
        <h2>{juuseri.name}</h2>
        <Segment>
          <h3>Added blogs</h3>
          <List>
            {juuseri.blogs.map(b =>
              <List.Item as='a' key={ b._id }>
                <Icon name='right triangle' />
                <List.Content>
                  <List.Header> {b.title} </List.Header>
                  <List.Description> {b.author} </List.Description>
                </List.Content>
              </List.Item>
            )}
          </List>
        </Segment>
      </div>
    )
  }
}

export default Juuseri