import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';

function FilteredEventsPage() {

    const router = useRouter();

    const filterData = router.query.slug;
    if(!filterData) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = Number(filteredYear);
    const numMonth = Number(filteredMonth);

    if( 
        isNaN(numYear) || isNaN(numMonth) || 
        numYear > 2030 || numYear < 2021 || 
        numMonth < 1 || numMonth > 12 
    ) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter, Please adjust your values...</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if( !filteredEvents || filteredEvents.length < 1) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for selected dates...</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);   // month is 0-index array in Date class


    return(
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents}/>
        </Fragment>
    );
}

export default FilteredEventsPage;