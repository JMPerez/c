import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { searchTracks, searchTracksReset } from '../actions/searchActions';
import { queueTrack } from '../actions/queueActions';

class ResultsList extends Component {
  render() {
    const { results, focus } = this.props;
    return (
      <ul className="add-to-queue__search-results">
        <style jsx>{`
          .add-to-queue__search-results {
            border: 1px solid #999;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .add-to-queue__search-results-item {
            padding: 5px 0 5px 5px;
          }
          .add-to-queue__search-results-item--focused {
            background-color: #eee;
          }
        `}</style>
        {results.map((r, index) => {
          const isFocused = focus === index;
          const className =
            'add-to-queue__search-results-item' + (isFocused ? ' add-to-queue__search-results-item--focused' : '');
          return (
            <li key={r.id} className={className} onClick={() => this.props.onSelect(r.id)}>
              {r.name} - {r.artists[0].name}
            </li>
          );
        })}
      </ul>
    );
  }
}

class AddToQueue extends Component {
  state = {
    text: this.props.text || '',
    focus: -1
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState({ text: text });
    if (text !== '') {
      this.props.searchTracks(text);
    } else {
      this.setState({ focus: -1 });
      this.props.searchTracksReset();
    }
  };

  handleSelectElement = id => {
    this.setState({ text: '' });
    this.props.queueTrack(id);
    this.props.searchTracksReset();
  };

  handleBlur = e => {
    // todo: this happens before the item from the list is selected, hiding the
    // list of results. We need to do this in a different way.
    /*    this.setState({ focus: -1 });
    this.props.searchTracksReset(); */
  };

  handleFocus = e => {
    if (e.target.value !== '') {
      this.props.searchTracks(e.target.value);
    }
  };

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 38: // up
        this.setState({ focus: this.state.focus - 1 });
        break;
      case 40: // down
        this.setState({ focus: this.state.focus + 1 });
        break;
      case 13: {
        let correct = false;
        if (this.state.focus !== -1) {
          this.props.queueTrack(this.props.search.results[this.state.focus].id);
          correct = true;
        } else {
          const text = e.target.value.trim();
          if (text.length !== 0) {
            this.props.queueTrack(text);
            correct = true;
          }
        }
        if (correct) {
          this.setState({ text: '' });
          this.props.searchTracksReset();
          this.setState({ focus: -1 });
        }
        break;
      }
    }
  };

  render() {
    const placeholder = this.props.intl.formatMessage({id: 'queue.add'});
    const results = this.props.search.results;
    return (
      <div className="add-to-queue" onBlur={this.handleBlur}>
        <style jsx>{`
          .add-to-queue__input {
            padding: 5px;
            width: 400px;
          }
        `}</style>
        <input
          className="add-to-queue__input"
          placeholder={placeholder}
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
        />
        {results && <ResultsList results={results} onSelect={this.handleSelectElement} focus={this.state.focus} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  searchTracks: query => dispatch(searchTracks(query)),
  searchTracksReset: () => dispatch(searchTracksReset())
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddToQueue));
