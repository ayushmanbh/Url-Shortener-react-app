import React, { useState } from 'react'
import Alert from './Alert'
const baseUrl = "https://api.shrtco.de/v2/shorten?url="

const Form = () => {
  const [longUrl, setLongUrl] = useState('')
  const [result, setResult] = useState({ forAttribute: '', forText: '' })
  const [isFetched, setIsFetched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  // let result = {}

  const fetchShortUrl = async (longUrl) => {
    const response = await fetch(baseUrl + longUrl)
    if (!response.ok) {
      throw new Error('Oops! Something went wrong. Please try after sometime.')
    }
    const data = await response.json()
    return data

  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\) \*\+,;=.]+$/gm
    if (!longUrl) {
      showAlert(true, 'danger', 'please enter value');
    } else if (longUrl && !urlPattern.test(longUrl)) {
      showAlert(true, 'danger', 'Please enter a valid url')
      setLongUrl('')
    } else {
      setLongUrl('')
      fetchShortUrl(longUrl)
        .then(data => {
          setIsLoading(false)
          setIsFetched(true)
          showAlert(true, 'success', 'Shortened link is ready.')
          setResult({ forAttribute: data.result.full_short_link, forText: data.result.short_link })
        })
        .catch(err => {
          setIsLoading(false)
          showAlert(true, 'danger', err.message)
        })
      setIsLoading(true)
    }
  }

  return (
    <div>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text">https://</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your loooong URL"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Shorten</button>
          </div>
        </div>
        {
          isLoading ? (
            <div>
              <p className="lead">
                generating your link...
              </p>
            </div>
          ) : isFetched ? (<div>
            <p className="lead">
              Shortened Link: <a href={result.forAttribute} target="_blank" rel='noreferrer'>{result.forText}</a>
            </p>
          </div>) : (
                <div>
                  <p className="lead">
                    Your Shortened link will appear here.
                  </p>
                </div>
              )
        }
      </form>
    </div>
  )
}

export default Form
