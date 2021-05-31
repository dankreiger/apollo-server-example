import { gql } from '@apollo/client';
export const TASKS = gql`
  query Tasks {
    tasks {
      id
      title
      description
      priority
      schedule_date
      due_date
      completed
    }
  }
`;
