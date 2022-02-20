import { shallowMount, mount } from '@vue/test-utils'
import DetailsView from '@/views/Details.vue'
import * as dep from '@vue/apollo-composable';
import router from '@/router'

jest.mock('@vue/apollo-composable')

const useQueryMock = dep.useQuery as jest.Mock;

const options = { global: { plugins: [router] } }

describe('Views | Details', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('Should render loading state', () => {
    const msg = 'Loading...'
    useQueryMock.mockReturnValue({
      loading: true,
    })

    const wrapper = shallowMount(DetailsView, options)
    
    const loadingElement = wrapper.find('.loading');
    expect(loadingElement.isVisible()).toBe(true)
    expect(loadingElement.text()).toMatch(msg)
  })

  it('Should render transaction details', () => {
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

    useQueryMock.mockReturnValue({
      result: { transaction },
      loading: false,
    })

    const wrapper = mount(DetailsView, options)
    const details = wrapper.find('tbody');
    const rows = details.findAll('tr').map(row => {
      return row.findAll('td').map(cell => cell.text())
    })
    const expectedRows = [
      ["ID", transaction.id],
      ["ACCOUNT", transaction.account],
      ["REFERENCE", transaction.reference],
      ["CATEGORY", transaction.category],
      ["DESCRIPTION", transaction.description],
      ["CURRENCY", transaction.currency],
      ["AMOUNT", transaction.amount],
      ["STATUS", transaction.status],
      ["TRANSACTION DATE", transaction.transactionDate],
      ["CREATED AT", transaction.createdAt]
    ]
    
    expect(rows).toStrictEqual(expectedRows)
  })
})
