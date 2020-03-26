// Dependencies.
import React, { Component } from 'react';
import filter from 'lodash/filter';
import get from 'lodash/get';
import sample from 'lodash/sample';
// Relative imports.
import JOKES from './JOKES';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
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

  generateJoke = () => {
    const { joke: currentJoke } = this.state;

    // Do not include the current joke.
    const filteredJokes = filter(
      JOKES,
      (joke) =>
        `${get(joke, 'preline')} ${get(joke, 'punchline')}` !==
        `${get(currentJoke, 'preline')} ${get(currentJoke, 'punchline')}`,
    );

    // Choose another joke.
    this.setState({ joke: sample(filteredJokes) });
  };

  render() {
    const { generateJoke } = this;
    const { joke } = this.state;

    return (
      <div className="app">
        <div />

        <div className="joke">
          {/* Generated Joke */}
          <h2 className={joke ? 'animate' : ''}>{get(joke, 'preline')}</h2>
          <h3 className={joke ? 'animate-long' : ''}>{get(joke, 'punchline')}</h3>

          {/* Generate a Joke */}
          <button onClick={generateJoke} type="button">
            Generate Dad Joke
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
