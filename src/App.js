import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {isLoading: true, placesList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const formattedData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      description: each.description,
      imageUrl: each.image_url,
    }))
    this.setState({placesList: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, placesList} = this.state
    return (
      <div className="main-container">
        <div>
          <h1 className="heading">Travel Guide</h1>
        </div>
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="places-list-ul-container">
            {placesList.map(each => (
              <li key={each.id} className="places-list-li-container">
                <img src={each.imageUrl} alt={each.name} />
                <h1>{each.name}</h1>
                <p>{each.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
