import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'
import noop from 'lodash/noop'

import WRGLFile from 'components/department-page/wrgl-file'

describe('WRGL file component', () => {
  it('should render correctly', () => {
    const updateExpandedCsvFilesStub = sinon.stub()
    const props = {
      name: 'Com Madison Village pd',
      slug: 'com-madisonville-pd',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      url:
        'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
      downloadUrl:
        'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
      updateExpandedCsvFiles: updateExpandedCsvFilesStub,
      expandedCsvFiles: [],
    }
    const container = render(<WRGLFile {...props} />)
    const { baseElement, getByText, getByTestId } = container

    expect(baseElement.textContent.includes('Com Madison Village pd')).toBe(
      true
    )

    const wrglContainer = baseElement.getElementsByClassName(
      'wrgl-container'
    )[0]
    expect(wrglContainer.classList.value).not.toContain('wrgl-expanded')

    const downloadAnchor = getByText('Download .csv')
    expect(downloadAnchor).toBeTruthy()
    fireEvent.click(downloadAnchor)

    const expandArrowElement = getByTestId('test--expand-control')
    fireEvent.click(expandArrowElement)
    expect(updateExpandedCsvFilesStub).toHaveBeenCalledWith(props.slug, false)
    expect(wrglContainer.classList.value).toContain('wrgl-expanded')

    fireEvent.click(expandArrowElement)
    expect(updateExpandedCsvFilesStub).toHaveBeenCalledWith(props.slug, true)
    expect(wrglContainer.classList.value).not.toContain('wrgl-expanded')
  })

  it('should display correct markdown', () => {
    const markdown =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      ' sed do eiusmod tempor incididunt ut labore et dolore magna' +
      ' aliqua. Ut enim ad minim veniam, quis nostrud exercitation' +
      ' ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
      ' Excepteur sint occaecat idatat non proident, sunt in culpa' +
      ' qui officia deserunt mollit anim id est laborum.'
    const props = {
      name: 'Com Madison Village pd',
      slug: 'com-madisonville-pd',
      description: markdown,
      url:
        'https://www.wrgl.co/em/@ipno/r/com-madisonville-pd/7e47b16aba077e1edf2e236ad2027cc6',
      downloadUrl:
        'https://www.wrgl.co/api/v1/users/ipno/repos/com-madisonville-pd/commits/7e47b16aba077e1edf2e236ad2027cc6/csv',
      updateExpandedCsvFiles: noop,
      expandedCsvFiles: [],
    }

    const container = render(<WRGLFile {...props} />)
    const { getByText, baseElement } = container

    const wrglDescription = baseElement.getElementsByClassName(
      'wrgl-description'
    )[0]

    expect(wrglDescription.classList).not.toContain('wrgl-description-expanded')

    const buttonMore = getByText('more')
    expect(buttonMore).toBeTruthy()

    fireEvent.click(buttonMore.parentElement)

    expect(wrglDescription.classList).toContain('wrgl-description-expanded')
  })
})
