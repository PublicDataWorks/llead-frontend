import { getQAA } from 'selectors/about-page'

describe('#getQAA', () => {
  it('returns questions and answer', () => {
    const state = {
      aboutPage: {
        about: [
          {
            section: 'General',
            qAndA: {
              question: 'Mauris id nibh eu fermentum?',
              answer: 'Nibh quisque suscipit fermentum netus nulla cras',
            },
          },
        ],
      },
    }
    const information = getQAA(state)

    expect(information).toStrictEqual([
      {
        section: 'General',
        qAndA: {
          question: 'Mauris id nibh eu fermentum?',
          answer: 'Nibh quisque suscipit fermentum netus nulla cras',
        },
      },
    ])
  })

  it('returns empty data if get no data', () => {
    const information = getQAA({})

    expect(information).toStrictEqual([])
  })
})
