import { Fragment, useEffect, useState } from 'react'

export default ({ renderTime }) => {
    let [time, setTime] = useState(renderTime)

    useEffect(() => {
        const timer = setInterval(async () => {
            let response = await fetch('/api/time')
            let serverTime = await response.json()
            setTime(serverTime.time)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return <Fragment>
        <p>This is the time: {time}</p>
    </Fragment>
}