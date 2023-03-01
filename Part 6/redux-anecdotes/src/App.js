import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App





// import { useSelector, useDispatch } from 'react-redux'
// import * as reducer from './reducers/anecdoteReducer'

// const App = () => {
//   // const anecdotes = useSelector(state => state)
//   const anecdotes = useSelector((state) => {
//     const cmp = (n) => {
//       return (p, q) => {
//         let a = p[n]
//         let b = q[n]
//         return b-a
//       }
//     }
//     return state.sort(cmp("votes"))
//   })


//   const dispatch = useDispatch()

//   const vote = (id) => {
//     // console.log('vote', id)
//     dispatch(reducer.voteAnecdotes(id))
//   }

//   const addNew = (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     dispatch(reducer.addAnecdotes(content))
//   }

//   return (
//     <div>
//       <h2>Anecdotes</h2>
//       {anecdotes.map(anecdote =>
//         <div key={anecdote.id}>
//           <div>
//             {anecdote.content}
//           </div>
//           <div>
//             has {anecdote.votes}
//             <button onClick={() => vote(anecdote.id)}>vote</button>
//           </div>
//         </div>
//       )}
//       <h2>create new</h2>
//       <form onSubmit={addNew}>
//         <div><input name="note" /></div>
//         <button type='submit'>create</button>
//       </form>
//     </div>
//   )
// }

// export default App