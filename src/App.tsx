import '../static/css/site.css'
import * as React from 'react'
import moment from 'moment'

const reverse_string = (text: string): string => text.split('').reduce((xs, x) => x + xs, '')


export const App = () => {
    const [start_from, setStartDate] = React.useState(0)
    const [total_days, setTotalDays] = React.useState(100000)
    const [pointer, movePointer] = React.useState(0)

    const dates: number[] = Array(total_days).fill(start_from)
        .map((v, i) => (i + v) * (86400 * 1000) /*The amount of milliseconds in a day */)
        .filter(v => {
            let date_string = moment(v).format('DDMMYYYY')
            let reverse = reverse_string(date_string)
            return date_string == reverse
        })



    return <div>

        <div>
            <label>Start at: {start_from}</label>
            <input type='date' value={moment(start_from).format('YYYY-MM-DD')} onChange={e => setStartDate(new Date(e.target.value).getDate())} />
        </div>

        <div>
            <label>Days in the future: </label>
            <input type="number" value={total_days} onChange={e => setTotalDays(Number(e.target.value))}/>
        </div>



        <div>
            <button onClick={() => movePointer(pointer == 0 ? dates.length - 1 : pointer - 1)}>
                Prev
        </button>

            <button onClick={() => movePointer(pointer == dates.length - 1 ? 0 : pointer + 1)}>
                Next
        </button>
        </div>


        <div>
            {dates.slice(0, pointer).map(date => <h2 key={date}>{moment(date).format('DD/MM/YYYY')}</h2>)}

            <h1>{moment(dates[pointer]).format('DD/MM/YYYY')}</h1>

            {dates.slice(pointer + 1, dates.length).map(date => <h2 key={date}>{moment(date).format('DD/MM/YYYY')}</h2>)}
        </div>

    </div>

}