import React from 'react';
import { IGQLData } from '../../../types';
import './App.scss';
import { Card } from '../components/Card';
import { useQuery } from '@apollo/client';
import { QUERY } from '../graphql';

function App(): JSX.Element {
  const { loading, error, data } = useQuery<IGQLData>(QUERY.TASKS);
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return (
      <div>
        <h1>
          <strong>ERROR: </strong>something went wrong
        </h1>
        <p>{JSON.stringify(error, null, 4)}</p>
      </div>
    );
  }
  if (data?.tasks) {
    return (
      <div className="card-container">
        {data.tasks.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    );
  } else {
    return <h1>no data</h1>;
  }
}

export default App;
