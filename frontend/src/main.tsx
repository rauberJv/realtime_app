import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { RealtimeProvider } from './contexts/RealtimeContext.tsx'

render(<RealtimeProvider><App /></RealtimeProvider>, document.getElementById('app')!)
