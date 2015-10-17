

function clipCoupons(data) {

	function clipCoupon(coupon) {
		return $.ajax({
			url: '/p/np/4230/Kroger/coupon/clip',
			type: 'GET',
			data: {
				id: coupon.coupon_id,
				clipsource: 'KWL',
				signature: coupon.signature

			},
			contentType: 'application/json',
			success: function (s) {
				console.log(s);
			},
			error: function (e) {
				console.log(e);
			}
		});
	}

	function getCouponMap(data) {
		var couponMap = {};
		$.each(data.coupons, function(i, val) {
	  		couponMap[val.coupon_id] = val;
		});
	
		$.each(data.clipped_coupons, function (i, val) { 
			delete couponMap[val];
		});

		return couponMap;
	}

	function forEachRelavantCoupon(data, couponMap, fn) {
		var deffereds = [];
		$.each(data.sort_order.Relevance, function(i, val) {
			if(couponMap[val]) {
				deffereds.push(fn(couponMap[val]));
			}
		});
		return deffereds;
	}
	
	var couponMap = getCouponMap(data);
	var deffereds = forEachRelavantCoupon(data, couponMap, clipCoupon);

	$.when.apply(null, deffereds).done(function() {
    	alert("Clipping Coupons Done.");        
    });
}



$.ajax({
	url: '/p/np/4230/Kroger/coupons',
	type: 'GET',
	data: {
		banner: 'Frys',
		usource: 'KWL'
	},
	contentType: 'application/json',
	success: function (data) {
		clipCoupons(data);
	},
	error: function(e) {
		console.log(e);
	}
});

