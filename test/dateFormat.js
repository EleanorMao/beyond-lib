  describe("dateFormat", function() {
  	var dateFormat = beyondlib.dateFormat
  	it("should works well with default format yyyy.MM.dd", function() {
  		// player.play(song);
  		var date = new Date();
  		var year = date.getFullYear();
  		var month = date.getMonth() + 1;
  		if (month < 10) month = '0' + month
  		var day = date.getDate()
  		if (day < 10) day = '0' + day
  		expect(dateFormat()).toEqual(year + '.' + month + '.' + day);
  		expect(dateFormat(date.getTime())).toEqual(year + '.' + month + '.' + day);

  	});

  	it("should works well with yyyyy yyyy yyy yy y", function() {
  		// player.play(song);
  		var date = new Date();
  		var year = '' + date.getFullYear();
  		expect(dateFormat('yyyyy')).toEqual('0' + year);
  		expect(dateFormat('yyyy')).toEqual(year);
  		expect(dateFormat('yyy')).toEqual(year);
  		expect(dateFormat('yy')).toEqual(year.slice(2));
  		expect(dateFormat('y')).toEqual(year.slice(2));
  	});
  	it("should works well with MM M", function() {
  		// player.play(song);
  		var date = new Date();
  		var month = '' + (date.getMonth() + 1);
  		var month2 = month
  		if (month.length == 1) month2 = '0' + month
  		expect(dateFormat('MM')).toEqual(month2);
  		expect(dateFormat('M')).toEqual(month);
  	});
  	it("should works well with dd d", function() {
  		// player.play(song);
  		var date = new Date(2015, 3, 2);
  		var day = date.getDate() + ''
  		var day2 = day
  		if (day.length == 1) day2 = '0' + day
  		expect(dateFormat('dd', date.getTime())).toEqual(day2);
  		expect(dateFormat('d', date.getTime())).toEqual(day);
  	});
  	it("should works well with HH H", function() {
  		// player.play(song);
  		var date = new Date();
  		var hours = date.getHours() + ''
  		var hours2 = hours
  		if (hours.length == 1) hours2 = '0' + hours
  		expect(dateFormat('HH')).toEqual(hours2);
  		expect(dateFormat('H')).toEqual(hours);
  	});
  	it("should works well with hh h", function() {
  		// player.play(song);
  		var date = new Date();
  		var hours = (date.getHours() % 12) + ''
  		var hours2 = hours
  		if (hours.length == 1) hours2 = '0' + hours
  		expect(dateFormat('hh')).toEqual(hours2);
  		expect(dateFormat('h')).toEqual(hours);
  	});
  	it("should works well with mm m", function() {
  		// player.play(song);
  		var date = new Date();
  		var minute = date.getMinutes() + ''
  		var minute2 = minute
  		if (minute.length == 1) minute2 = '0' + minute
  		expect(dateFormat('mm')).toEqual(minute2);
  		expect(dateFormat('m')).toEqual(minute);
  	});
  	it("should works well with ss s", function() {
  		// player.play(song);
  		var date = new Date();
  		var second = date.getSeconds() + ''
  		var second2 = second
  		if (second.length == 1) second2 = '0' + second
  		expect(dateFormat('ss')).toEqual(second2);
  		expect(dateFormat('s')).toEqual(second);
  	});
  	it("should works well with S", function() {
  		// player.play(song);
  		var date = new Date();
  		var milliseconds = date.getMilliseconds() + ''
  		expect(dateFormat('SS', date.getTime())).toEqual(milliseconds);
  		expect(dateFormat('S', date.getTime())).toEqual(milliseconds);
  	});
  	it("should works well with u", function() {
  		// player.play(song);
  		var date = new Date();
  		var day = '' + date.getDay()
  		expect(dateFormat('u', date.getTime())).toEqual(day);
  	});
  	it("should works well with unrelated letters", function() {
      var date = new Date(2007,0,01)
  		expect(dateFormat('yyyyv V l L',date)).toEqual('2007v V l L');
  	});
  });