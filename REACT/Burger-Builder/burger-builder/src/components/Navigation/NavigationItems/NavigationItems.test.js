import {configure, shallow} from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
configure({adapter:new Adapter()})

describe('<Navigation Items />',()=>{
    let wrapper = null;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)
    })
    it('should render two <NavigationItem /> elements if not authenticated',()=>{
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('should render three <NavigationItem /> elements if authenticated',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);   
    })

    it('should check whether NavigationItem is present or not',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    })
})