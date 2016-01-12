describe("dateDiff", function() {
	var dayMilliseconds = 86400000
	var years = beyondlib.dateDiff.years
	var months = beyondlib.dateDiff.months
	var days = beyondlib.dateDiff.days
	var hours = beyondlib.dateDiff.hours
	var minutes = beyondlib.dateDiff.minutes
	var seconds = beyondlib.dateDiff.seconds
	it('should works on years',function(){
		expect(years(new Date(1970,0,2,15,59,59),new Date(1970,0,2,16,0,0))).toEqual(0)
		expect(years(new Date(1970,0,2,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(0)
		expect(years(new Date(1970,0,2,15,59,59),new Date(1971,1,3,16,0,0))).toEqual(-1)
		expect(years(new Date(1971,1,3,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(1)
		expect(years(new Date(1970,2,2,15,59,59),new Date(1980,4,4,16,0,0))).toEqual(-10)
		expect(years(new Date(1980,4,4,16,0,0),new Date(1970,2,2,15,59,59))).toEqual(10)
	})
	it('should works on months',function(){
		expect(months(new Date(1970,0,2,15,59,59),new Date(1970,0,2,16,0,0))).toEqual(0)
		expect(months(new Date(1970,0,2,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(0)
		expect(months(new Date(1970,0,2,15,59,59),new Date(1970,1,3,16,0,0))).toEqual(-1)
		expect(months(new Date(1970,1,3,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(1)
		expect(months(new Date(1970,2,2,15,59,59),new Date(1971,4,4,16,0,0))).toEqual(-(2 + 12))
		expect(months(new Date(1971,4,4,16,0,0),new Date(1970,2,2,15,59,59))).toEqual((2 + 12))
		expect(months(new Date(1999,2,2,15,59,59),new Date(2001,4,4,16,0,0))).toEqual(-(2 + 12*2))
		expect(months(new Date(2001,4,4,16,0,0),new Date(1999,2,2,15,59,59))).toEqual((2 + 12*2))
	})
	it('should works on days',function(){
		expect(days(new Date(1970,0,2,15,59,59),new Date(1970,0,2,16,0,0))).toEqual(0)
		expect(days(new Date(1970,0,2,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(0)
		expect(days(new Date(1970,0,2,15,59,59),new Date(1970,0,3,16,0,0))).toEqual(-1)
		expect(days(new Date(1970,0,3,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(1)
		expect(days(new Date(1970,0,2,15,59,59),new Date(1971,0,4,16,0,0))).toEqual(-(2 + 365))
		expect(days(new Date(1971,0,4,16,0,0),new Date(1970,0,2,15,59,59))).toEqual((2 + 365))
		expect(days(new Date(1999,0,2,15,59,59),new Date(2001,0,4,16,0,0))).toEqual(-(2 + 365 + 366))
		expect(days(new Date(2001,0,4,16,0,0),new Date(1999,0,2,15,59,59))).toEqual((2 + 365 + 366))
	})
	it('should works on hours',function(){
		expect(hours(new Date(1970,0,2),new Date(1970,0,9))).toEqual(-7*24)
		expect(hours(new Date(1970,0,2,15),new Date(1970,0,3))).toEqual(-9)
		expect(hours(new Date(1970,0,2,15,59,59),new Date(1970,0,2,16,30,59))).toEqual(-1)
		expect(hours(new Date(1970,0,2,15,59,59),new Date(1970,0,2,16,0,0))).toEqual(-1)
		expect(hours(new Date(1970,0,2,15,59,59),new Date(1970,0,3,16,0,0))).toEqual(-1 - dayMilliseconds / 1000 / 60 / 60)
		expect(hours(new Date(1970,0,2,15,59,59),new Date(1971,0,4,16,0,0))).toEqual(-1 - (2 + 365) * dayMilliseconds / 1000 / 60 / 60)
		expect(hours(new Date(1999,0,2,15,59,59),new Date(2001,0,4,16,0,0))).toEqual(-1 - (2 + 365 + 366) * dayMilliseconds / 1000 / 60 / 60)
	})
	it('should works on minutes',function(){
		expect(minutes(new Date(1970,0,2,15,59,59),new Date(1970,0,2,16,0,0))).toEqual(-1)
		expect(minutes(new Date(1970,0,2,15,59,59),new Date(1970,0,3,16,0,0))).toEqual(-1 - dayMilliseconds / 1000 / 60)
		expect(minutes(new Date(1970,0,2,15,59,59),new Date(1971,0,4,16,0,0))).toEqual(-1 - (2 + 365) * dayMilliseconds / 1000 / 60)
		expect(minutes(new Date(1999,0,2,15,59,59),new Date(2001,0,4,16,0,0))).toEqual(-1 - (2 + 365 + 366) * dayMilliseconds / 1000 / 60)
		expect(minutes(new Date(1970,0,2,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(1)
		expect(minutes(new Date(1970,0,3,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(1 + dayMilliseconds / 1000 / 60)
		expect(minutes(new Date(1971,0,4,16,0,0),new Date(1970,0,2,15,59,59))).toEqual(1 + (2 + 365) * dayMilliseconds / 1000 / 60)
		expect(minutes(new Date(2001,0,4,16,0,0),new Date(1999,0,2,15,59,59))).toEqual(1 + (2 + 365 + 366) * dayMilliseconds / 1000 / 60)
	})
	it('should works on seconds',function(){
		expect(seconds(new Date(1970,0,2,15,59,59,999),new Date(1970,0,2,16,0,0))).toEqual(-1)
		expect(seconds(new Date(1970,0,2,15,59,59,999),new Date(1970,0,3,16,0,0,999))).toEqual(-1 - dayMilliseconds / 1000)
		expect(seconds(new Date(1970,0,2,15,59,59,999),new Date(1971,0,4,16,0,0,0))).toEqual(-1 - (2 + 365) * dayMilliseconds / 1000)
		expect(seconds(new Date(1999,0,2,15,59,59,990),new Date(2001,0,4,16,0,0,999))).toEqual(-1 - (2 + 365 + 366) * dayMilliseconds / 1000 )
		expect(seconds(new Date(1970,0,2,16,0,0),new Date(1970,0,2,15,59,59,999))).toEqual(1)
		expect(seconds(new Date(1970,0,3,16,0,0,999),new Date(1970,0,2,15,59,59,999))).toEqual(1 + dayMilliseconds / 1000)
		expect(seconds(new Date(1971,0,4,16,0,0,0),new Date(1970,0,2,15,59,59,999))).toEqual(1 + (2 + 365) * dayMilliseconds / 1000)
		expect(seconds(new Date(2001,0,4,16,0,0,999),new Date(1999,0,2,15,59,59,990))).toEqual(1 + (2 + 365 + 366) * dayMilliseconds / 1000 )
	})
})