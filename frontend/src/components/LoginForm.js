import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
      <div className="kirjauduDiv">
        <h2>Kirjaudu</h2>

        <form onSubmit={handleSubmit}>
            <div>
            käyttäjätunnus
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
            />
            </div>
            <div>
            salasana
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            </div>
            <button>kirjaudu</button>
        </form>
      </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm