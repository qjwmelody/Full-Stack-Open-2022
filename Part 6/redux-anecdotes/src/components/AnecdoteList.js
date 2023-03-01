import { useSelector, useDispatch } from 'react-redux'
import * as anecdoteReducer from '../reducers/anecdoteReducer'
import * as notificationReducer from '../reducers/notificationReducer'

const AnecdoteList = () => {
  // const anecdotes = useSelector(state => state)
  const anecdotes = useSelector((state) => {
    const cmp = (n) => {
      return (p, q) => {
        let a = p[n]
        let b = q[n]
        return b-a
      }
    }
    return state.anecdotes.sort(cmp("votes"))
  })


  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    content = 'You voted'
    dispatch(notificationReducer.createNotification(content))
    dispatch(anecdoteReducer.voteAnecdotes(id))

  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList