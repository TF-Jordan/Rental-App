export interface WorkingHours {
	start: string;
	end: string;
}

export interface ScheduledRide {
	date: string;
	time: string;
	destination: string;
}


export interface Scheduling {
	working_hours: WorkingHours;
	days_off: { start: string; end: string }[];
	scheduled_ranges: { start: string; end: string }[];
}