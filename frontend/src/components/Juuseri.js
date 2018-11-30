import React from 'react'
import { Icon, List } from 'semantic-ui-react'

class Juuseri extends React.Component {
  render () {
    const { juuseri } = this.props

    return(
      <div>
        <h2>{juuseri.name}</h2>
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
      </div>
    )
  }
}

export default Juuseri