import { useAppSelector, useAppDispatch } from './hooks/redux'
import { increment, decrement, incrementByAmount } from './store/slices/counterSlice'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kaney Marketplace</h1>
        <p>Proyecto React con TypeScript, Redux y React Router</p>
        
        <div className="counter-section">
          <h2>Contador Redux</h2>
          <div className="counter-display">
            <span>Valor actual: {count}</span>
          </div>
          <div className="counter-buttons">
            <button onClick={() => dispatch(increment())}>
              Incrementar
            </button>
            <button onClick={() => dispatch(decrement())}>
              Decrementar
            </button>
            <button onClick={() => dispatch(incrementByAmount(5))}>
              +5
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App