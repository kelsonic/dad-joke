// Dependencies.
import React, { Component } from 'react';
import get from 'lodash/get';
// Relative imports.
import logo from 'assets/images/logo.svg';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      joke: undefined,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    // Generate joke if they press enter.
    if (event.keyCode === 13) {
      this.generateJoke();
    }
  };

  generateJoke = async () => {
    const { fetching } = this.state;

    // Escape early if we are already fetching a random joke.
    if (fetching) {
      return;
    }

    // Turn on fetching state.
    this.setState({ fetching: true });

    fetch('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes')
      .then((res) => res.json())
      .then((joke) => {
        this.setState({ fetching: false, joke });
      })
      .catch((err) => {
        console.error('Error fetching dad joke', err);
        this.setState({ fetching: false });
      });
  };

  render() {
    const { generateJoke } = this;
    const { fetching, joke } = this.state;

    return (
      <div className="app">
        <div />

        <div className="joke">
          {/* Logo */}
          {!joke && <img alt="logo" src={logo} />}

          {/* Generated Joke */}
          {joke && (
            <>
              <h2 className={joke ? 'animate' : ''}>{get(joke, 'setup')}</h2>
              <h3 className={joke ? 'animate-long' : ''}>{get(joke, 'punchline')}</h3>
            </>
          )}

          {/* Generate a Joke */}
          <button onClick={generateJoke} type="button">
            {fetching ? '...' : 'Generate Dad Joke'}
          </button>
        </div>

        <p className="made-with">
          Made with love by <a href="https://github.com/ncksllvn">Nick Sullivan</a> and{' '}
          <a href="https://github.com/kelsonic">Kelson Adams</a> — fork or suggest edits on{' '}
          <a href="https://github.com/kelsonic/dad-joke">GitHub</a>!
        </p>
      </div>
    );
  }
}

export default App;
