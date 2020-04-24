import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Menus from '../ui/components/menus.js'

test('can click menu buttons', () => {
  render(<Menus />)
  fireEvent.click(screen.getByText('File'))
})
