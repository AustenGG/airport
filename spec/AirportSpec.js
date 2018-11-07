'use strict';

 describe('Airport', function(){
   var airport;
   var plane;
   var weather;

   beforeEach(function(){
     plane = jasmine.createSpy('plane');
     weather = jasmine.createSpyObj('weather', ['isStormy']);
     airport = new Airport(weather);
   });

   it('Empty airfield', function(){
     expect(airport.planes()).toEqual([]);
   });

   describe('under normal conditions',function(){
     beforeEach(function(){
       weather.isStormy.and.returnValue(false);
     });
     it(' clears planes for landing', function(){
       airport.clearForLanding(plane);
       expect(airport.planes()).toEqual([plane]);
     });
     it(' clears planes for takeoff', function(){
       airport.clearForLanding(plane);
       airport.clearForTakeOff(plane);
       expect(airport.planes()).toEqual([]);
     });
   });

   describe('under stormy conditions',function(){
     beforeEach(function(){
       weather.isStormy.and.returnValue(true);
     });
     it('does not clear planes for landing', function(){
       expect(function(){ airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
     });
     it('does not clear planes for takeoff', function(){
       expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff during storm');
     });
   });
 });
