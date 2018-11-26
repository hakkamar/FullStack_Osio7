import React from 'react'

class Juuseri extends React.Component {
  render () {
    const { juuseri } = this.props

    return(
      <div>
        <h2>{juuseri.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {juuseri.blogs.map(b =>
            <li key={ b._id }>
              {b.title} by {b.author}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Juuseri