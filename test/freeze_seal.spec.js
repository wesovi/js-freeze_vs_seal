/**
 * Created by Ivan on 3/3/16.
 */
"use strict";

var expect = chai.expect;

var should = chai.should();


describe('Modifying attribute values.',function(){

    var dataInput = null;

    beforeEach( function(){
        dataInput = {
            prop:'A',
            prop2:'B',
            prop3:'C'
        }
    });

    it('All attributes in an object can be modified', function() {
        dataInput.prop ='B';
        dataInput.prop2 ='C';
        dataInput.prop3 ='A';
        expect(dataInput.prop.should.be.equal('B'));
        expect(dataInput.prop2.should.be.equal('C'));
        expect(dataInput.prop3.should.be.equal('A'));
    });

});

describe('Object.freeze ',function(){

    it('An error is thrown when trying modifying an attribute value after freezing the object', function(){
        var dataInput = Object.freeze({prop:'A',prop2:'B',prop3:'C'});
        var fn = function(){
            dataInput.prop = 'C';
        }
        expect(fn).to.throw(TypeError);
        expect(dataInput.prop.should.be.equal('A'));
    });


});

describe('Object.seal ',function(){

    it('An error is thrown when trying adding a new one attribute to a sailed object', function(){
        var dataInput = Object.seal({prop:'A',prop2:'B',prop3:'C'});
        var fn = function(){
            dataInput.prop4 = 'D';
        }
        expect(fn).to.throw(TypeError);
        expect(dataInput.should.be.deep.equal({prop:'A',prop2:'B',prop3:'C'}));
    });

    it('We can modify value for existing attributes in an object', function(){
        var dataInput = Object.seal({prop:'A',prop2:'B',prop3:'C'});
        dataInput.prop = 'C';
        expect(dataInput.should.be.deep.equal({prop:'C',prop2:'B',prop3:'C'}));
    });

});


describe('Object.defineProperty ',function(){


    it('throws an error when trying to modify a non-writable attribute', function(){
        var object = {};
        Object.defineProperty(object, 'prop', {
            writable: true,
            value: 'A'
        });
        Object.defineProperty(object, 'prop2', {
            writable: false,
            value: 'B'
        });
        Object.defineProperty(object, 'prop3', {
            writable: false,
            value: 'C'
        });

        var fn = function(){
            object.prop2 = 'C'
        };
        expect(fn).to.throw(TypeError);
        var fn2 = function(){
            object.prop3 = 'A'
        };
        expect(fn2).to.throw(TypeError);
        expect(object.prop.should.be.equal('A'));
        expect(object.prop2.should.be.equal('B'));
        expect(object.prop3.should.be.equal('C'));

    });


    it('We can only modify value for those attributes which are writable', function(){
        var object = {};
        Object.defineProperty(object, 'prop', {
            writable: true,
            value: 'A'
        });
        Object.defineProperty(object, 'prop2', {
            writable: false,
            value: 'B'
        });
        Object.defineProperty(object, 'prop3', {
            writable: false,
            value: 'C'
        });

        object.prop = 'B';

        expect(object.prop.should.be.equal('B'));
        expect(object.prop2.should.be.equal('B'));
        expect(object.prop3.should.be.equal('C'));
    });

    it('We can add new attributes to an object that has been created making use of with defineProperty method', function(){
        var object = {};
        Object.defineProperty(object, 'prop', {
            writable: true,
            value: 'A'
        });
        Object.defineProperty(object, 'prop2', {
            writable: false,
            value: 'B'
        });
        Object.defineProperty(object, 'prop3', {
            writable: false,
            value: 'C'
        });
        object.prop4 = 'D';
        object.prop4 = 'E';

        expect(object.prop.should.be.equal('A'));
        expect(object.prop2.should.be.equal('B'));
        expect(object.prop3.should.be.equal('C'));
        expect(object.prop4.should.be.equal('E'));
    });

});