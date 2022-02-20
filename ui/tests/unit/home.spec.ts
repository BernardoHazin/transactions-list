import { shallowMount, mount } from '@vue/test-utils'
import HomeView from '@/views/Home.vue'
import * as dep from '@vue/apollo-composable';
import router from '@/router'

jest.mock('@vue/apollo-composable')

const useQueryMock = dep.useQuery as jest.Mock;

const options = { global: { plugins: [router] } }

describe('Views | Home', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('Should render loading state', () => {
    const msg = 'Loading...'
    useQueryMock.mockReturnValue({
      loading: true,
    })

    const wrapper = shallowMount(HomeView, options)
    
    const loadingElement = wrapper.find('.loading');
    expect(loadingElement.isVisible()).toBe(true)
    expect(loadingElement.text()).toMatch(msg)
  })

  it('Should render list of transactions', () => {
    const transaction = {
      id: '1',
      account: 'account',
      reference: 'reference',
      category: 'category',
      description: 'description',
      currency: 'currency',
      amount: 'amount',
      status: 'status',
      transactionDate: 'transactionDate',
      createdAt: 'createdAt',
    }
    const transactions = [transaction]

    useQueryMock.mockReturnValue({
      result: { transactions },
      loading: false,
    })

    const wrapper = mount(HomeView, options)
    const list = wrapper.find('tbody');
    const row = list.findAll('td').map(cell => cell.text())
    const expectedRow = Object.values(transaction)

    expect(list.isVisible()).toBe(true)
    expect(list.findAll('tr').length).toEqual(1)
    expect(row).toStrictEqual(expectedRow)
  })

  it('Should trigger a refetch if a date filter is selected', async () => {
    const fake = jest.fn()
    
    useQueryMock.mockReturnValue({
      loading: false,
      result: { transactions: [] },
      refetch: fake
    })

    const wrapper = mount(HomeView, options)
    
    const form = wrapper.find('form')
    const from = '2020-01-01'
    const to = '2020-02-01'
    const startDateInput = wrapper.find('input[name="start-date"]')
    const endDateInput = wrapper.find('input[name="end-date"]')

    startDateInput.setValue(from)
    endDateInput.setValue(to)

    await form.trigger('submit')

    const calls = fake.mock.calls
    const [firstCall] = calls

    expect(fake.mock.calls.length).toEqual(1)
    expect(firstCall).toEqual([{ from, to }])
  })
})
