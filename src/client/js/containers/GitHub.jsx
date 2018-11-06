import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import treeChanges from 'tree-changes';

import { Table } from 'tfs-ui';

import { getRepos, showAlert, switchMenu } from 'actions';
import { STATUS } from 'constants/index';

import Loader from 'components/Loader';

class GitHubComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onClickRepo = this.onClickRepo.bind(this);

    this.state = {
      query: 'react',
    };
    this.columns = [
      {
        Header: 'Logo',
        accessor: 'avatar',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Owner',
        accessor: 'owner',
      },
      {
        Header: 'Stars',
        accessor: 'stars',
      },
    ];
  }

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getRepos(query));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('github.repos.status', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.github.repos.message, { type: 'error' }));
    }
  }

  onClickRepo = (e) => {
    const { query } = e.currentTarget.dataset;
    const { dispatch } = this.props;

    this.setState({
      query,
    });

    dispatch(switchMenu(query));
  };

  render() {
    const { query } = this.state;
    const { github } = this.props;
    let output;

    if (github.repos.status === STATUS.READY) {
      const rawData = github.repos.data[query];
      if (rawData) {
        const gitData = rawData.map((item) => ({
          name: item.name,
          description: item.description,
          owner: item.owner.login,
          avatar: <img src={item.owner.avatar_url} alt={item.owner.login} style={{ width: '40px' }} />,
          stars: item.stargazers_count,
        }));

        output = (
          <Table
            data={gitData}
            columns={this.columns}
          />
        );
      }
      else {
        output = <h3>Nothing found</h3>;
      }
    }
    else {
      output = <Loader />;
    }

    return (
      <div key='GitHub' className='app__github'>
        <div
          className='app__github__selector'
          style={{
            textAlign: 'center',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          <div className='btn-group' role='group' aria-label='Basic example'>
            <button
              type='button'
              className={cx('btn', {
                'btn-primary': query === 'react',
                'btn-outline-primary': query !== 'react',
                'btn-loading': query === 'react' && github.repos.status === 'running',
              })}
              data-query='react'
              onClick={this.onClickRepo}
            >
              React
            </button>
            <button
              type='button'
              className={cx('btn', {
                'btn-primary': query === 'redux',
                'btn-outline-primary': query !== 'redux',
                'btn-loading': query === 'redux' && github.repos.status === 'running',
              })}
              data-query='redux'
              onClick={this.onClickRepo}
            >
              Redux
            </button>
          </div>
        </div>
        {output}
      </div>
    );
  }
}

GitHubComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return { github: state.github };
}

export default connect(mapStateToProps)(GitHubComponent);
