import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let mockHandler2 = jest.fn()
    let component
    beforeEach(() => {
        const blog = {
            author: 'AuthorTest3', 
            title: 'TitleTest3',
            likes: '2',
            url: 'http://localhost:8888',
            user:{
                username: 'Test1',
                name: 'Test1',
            }
        }
        component = render(
            <Blog blog={blog} handlelike={mockHandler2}/>
        )
    })

    // Tese 1
    test('Blogs render the author and title', () => {
        expect(component.container).toHaveTextContent('AuthorTest3')
        expect(component.container).toHaveTextContent('TitleTest3')
    })

    // Test 2
    test('Clicking the view button', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('2')
        expect(component.container).toHaveTextContent('http://localhost:8888')
    })

    // Test 3
    test('Clicking the like button twice', () => {
        const buttonView = component.getByText('view')
        fireEvent.click(buttonView)

        const buttonForLike = component.getByText('like')
        fireEvent.click(buttonLike)
        fireEvent.click(buttonLike)

        expect(mockHandlerForLikeButton.mock.calls).toHaveLength(2)
    })
})