import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export function Calendar({ calData, calLoading, fetchCalData }) { 

    //console.log(`The calendar is loading: ${calLoading}`)
    //console.log(calData[0])

    const reservationAuthor = (eventInfo) => {
        return (
            <>
                <span>{eventInfo.event.extendedProps.author}</span>
            </>
        )
    }

    //const [calView, setCalView] = useState()
    const[screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [window.innerWidth])


    return (
        <div className='calendar-container' >
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    listPlugin,
                    interactionPlugin,
                ]}
                headerToolbar= {{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,listMonth'
                }}
                initialView={screenWidth < 550 ? 'listMonth':'dayGridMonth'}
                handleWindowResize={true}
                selectable={true}
                events= {calData}
                dayMaxEvents={true}
                eventInteractive={true}
                eventContent={reservationAuthor}
                eventDidMount={ (info) => {
                    tippy(info.el, {
                        placement: 'top',
                        trigger: 'click',
                        theme: 'cedarF-theme',
                        touch: 'hold',
                        interactive: true,
                        appendTo: document.body,
                        allowHTML: true,
                        content: `
                            <div style="max-width: 25vh;">
                                <h3>
                                    ${info.event.title}
                                </h3>
                                <hr style="width: 25vh; margin-bottom: 1vh; margin-top: 1vh;"/>
                                <h5>${info.event.extendedProps.room}</h5>
                                <p style="margin-bottom: 0;">Boy side bunks:${info.event.extendedProps.boyBunkBeds}</p>
                                <p style="margin-bottom: 0;">&</p>
                                <p style="margin-bottom: 1vh;">Girl side bunks: ${info.event.extendedProps.girlBunkBeds}</p>
                                <hr style="width: 25vh; margin-bottom: 0;"/>
                                <p style="margin-bottom: .25vh; margin-top: .5vh;"><u>Details:</u></p>
                                <p style="margin-bottom: 1vh;">${info.event.extendedProps.description}</p>
                            </div>
                        `,
                    });
                }}
                viewDidMount={ (calView) => {
                    
                }}
            />
        </div>
    )

}
    
export default Calendar;