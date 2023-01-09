import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Create from './Createblog'

describe('<Create />', () => {
    test('create', () => {
        const blogs = []
        let mockHandler = jest.fn()
        const component = render(
            <Create blogs={blogs} setBlogs={mockHandler}/>
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'TestTitle0' }
        })
        fireEvent.change(author, {
            target: { value: 'TestAuthor0' }
        })
        fireEvent.change(url, {
            target: { value: 'http://localhost:6666' }
        })
        fireEvent.submit(form)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})