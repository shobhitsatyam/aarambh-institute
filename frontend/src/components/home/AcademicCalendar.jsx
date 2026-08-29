import React, { useState } from 'react';
import './AcademicCalendar.css';

const eventsData = {
    '2025-03-31': [{ title: 'Early Bird Admission', type: 'admission', desc: '15% discount on course fee' }],
    '2025-04-15': [{ title: 'Regular Admission', type: 'admission', desc: 'Without late fee' }],
    '2025-04-30': [{ title: 'Late Admission', type: 'admission', desc: 'With late fee ₹500' }],
    '2025-05-15': [{ title: 'TMA Submission', type: 'tma', desc: 'Submit assignments online' }],
    '2025-06-01': [{ title: 'Theory Exams Begin', type: 'exam', desc: 'Board exams for all subjects' }],
    '2025-06-30': [{ title: 'Theory Exams End', type: 'exam', desc: 'Last day of theory exams' }],
    '2025-07-10': [{ title: 'Practical Exams Begin', type: 'exam', desc: 'Science practicals start' }],
    '2025-07-20': [{ title: 'Practical Exams End', type: 'exam', desc: 'Last day of practicals' }],
    '2025-08-15': [{ title: 'TMA Results', type: 'result', desc: 'Assignment results announced' }],
    '2025-09-30': [{ title: 'Theory Results', type: 'result', desc: 'Final results declared' }],
    '2025-10-15': [{ title: 'Certificate Issuance', type: 'result', desc: 'Get your certificates' }]
};

const AcademicCalendar = () => {
    // Initial date set to March 2026 based on original code
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2));
    const [activeView, setActiveView] = useState('calendar'); // 'calendar' or 'timeline'

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

        let cells = [];

        // Previous month filler days
        for (let i = firstDay - 1; i >= 0; i--) {
            cells.push(
                <div key={`prev-${i}`} className="l360-date-cell other-month">
                    <div className="l360-date-number">{prevMonthLastDay - i}</div>
                </div>
            );
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = eventsData[dateStr] || [];
            const isToday = isCurrentMonth && today.getDate() === day;

            cells.push(
                <div key={`current-${day}`} className={`l360-date-cell ${isToday ? 'today' : ''}`}>
                    <div className="l360-date-number">{day}</div>
                    {dayEvents.map((event, idx) => (
                        <div key={idx} className={`l360-event-marker ${event.type}`} title={event.desc}>
                            <div className="l360-event-title">{event.title}</div>
                        </div>
                    ))}
                </div>
            );
        }

        // Next month filler days
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
        const remainingCells = totalCells - (firstDay + daysInMonth);
        for (let day = 1; day <= remainingCells; day++) {
            cells.push(
                <div key={`next-${day}`} className="l360-date-cell other-month">
                    <div className="l360-date-number">{day}</div>
                </div>
            );
        }

        return cells;
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <section className="l360-calendar-section">
            <div className="l360-calendar-wrapper">
                <div className="l360-calendar-header">
                    <span className="l360-calendar-badge">STAY UPDATED</span>
                    <h2 className="l360-calendar-heading">
                        <img src="/assets/images/icons/calendar.png" alt="Calendar" />
                        Academic Calendar 2026-27
                    </h2>
                    <p className="l360-calendar-subheading">
                        Never miss important deadlines! View all admission dates, exam schedules, and result announcements.
                    </p>
                </div>

                <div className="l360-calendar-layout">
                    <div>
                        <div className="l360-calendar-nav">
                            <div className="l360-nav-buttons">
                                <button className="l360-nav-btn" onClick={() => changeMonth(-1)}>← Prev</button>
                                <button className="l360-nav-btn" onClick={() => changeMonth(1)}>Next →</button>
                            </div>
                            <div className="l360-current-month">
                                {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                            </div>
                            <div className="l360-view-buttons">
                                <button className={`l360-view-btn ${activeView === 'calendar' ? 'active' : ''}`} onClick={() => setActiveView('calendar')}>Calendar</button>
                                <button className={`l360-view-btn ${activeView === 'timeline' ? 'active' : ''}`} onClick={() => setActiveView('timeline')}>Timeline</button>
                            </div>
                        </div>

                        {activeView === 'calendar' && (
                            <div className="l360-calendar-grid">
                                <div className="l360-weekdays">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="l360-weekday">{day}</div>
                                    ))}
                                </div>
                                <div className="l360-dates">
                                    {renderCalendarDays()}
                                </div>
                            </div>
                        )}

                        {activeView === 'timeline' && (
                            <div className="l360-timeline-view active">
                                <div className="l360-timeline-title">
                                    <img src="/assets/images/icons/timeline.png" alt="Timeline" />
                                    Academic Year 2026-27 Timeline
                                </div>
                                <div className="l360-timeline">
                                    {/* Timeline Items Mapping */}
                                    {[
                                        { date: 'April 2025', event: '🎓 Admissions Open', desc: 'Start of new academic session' },
                                        { date: 'May 2025', event: '📝 TMA Submission Window Opens', desc: 'Submit assignments for 20% weightage' },
                                        { date: 'June 2025', event: '✍️ Theory Examinations', desc: 'Annual board examinations' },
                                        { date: 'July 2025', event: '🔬 Practical Examinations', desc: 'Science and vocational practicals' },
                                        { date: 'August 2025', event: '📊 Result Preparation', desc: 'Evaluation process begins' },
                                        { date: 'September 2025', event: '📜 Results Declaration', desc: 'Final results announced' },
                                        { date: 'October 2025', event: '🏆 Certificate Distribution', desc: 'Mark sheets and certificates issued' }
                                    ].map((item, i) => (
                                        <div key={i} className="l360-timeline-item">
                                            <div className="l360-timeline-date">{item.date}</div>
                                            <div className="l360-timeline-event">{item.event}</div>
                                            <div className="l360-timeline-desc">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="l360-events-sidebar">
                        <h4 className="l360-sidebar-title">📅 Upcoming Events</h4>
                        <ul className="l360-upcoming-events">
                            {[
                                { day: '31', month: 'Mar', title: 'Early Bird Admission', type: '15% discount' },
                                { day: '15', month: 'Apr', title: 'Regular Admission', type: 'Without late fee' },
                                { day: '15', month: 'May', title: 'TMA Submission', type: '20% weightage' },
                                { day: '1', month: 'Jun', title: 'Theory Exams Begin', type: 'Board exams start' }
                            ].map((evt, idx) => (
                                <li className="l360-upcoming-event" key={idx}>
                                    <div className="l360-event-date-badge">
                                        <div className="l360-event-day">{evt.day}</div>
                                        <div className="l360-event-month">{evt.month}</div>
                                    </div>
                                    <div className="l360-event-details">
                                        <div className="l360-event-name">{evt.title}</div>
                                        <div className="l360-event-type">{evt.type}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcademicCalendar;