import renderer from 'react-test-renderer';
import MenuBtn from './ui/MenuBtn/MenuBtn';
import { MemoryRouter, RouterProvider } from 'react-router-dom';
import { router } from './router';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import SortBtn from './ui/sortBtn/SortBtn';
import FilterBtn from './ui/filterBtn/FilterBtn';


describe("MenuBtn", () => {
    it('Render button with right text', () => {  
        render(
            <MemoryRouter>
              <MenuBtn text="Genres" link="/genres" active={false} />
            </MemoryRouter>)
        const btnText = screen.getByTestId('text');
        expect(btnText).toHaveTextContent('Genres');
    });

    it('MenuBtn toggle active class', () => {   
        const {rerender} = render(
            <MemoryRouter>
              <MenuBtn text="Genres" link="/genres" active={true} />
            </MemoryRouter>)  
        let container = screen.getByTestId('linkParent');
        expect(container.classList.contains('active')).toBe(true);
        rerender(
            <MemoryRouter>
              <MenuBtn text="Genres" link="/genres" active={false} />
            </MemoryRouter>)  
        container = screen.getByTestId('linkParent');
        expect(container.classList.contains('active')).not.toBe(true);
    });
})

describe("SortBtn", () => {
    let toggler = true;
    it('Render button with right text', () => {  
        render(
            <MemoryRouter>
              <SortBtn title="Relevance" toggler={toggler} onClick={() => {toggler = !toggler}} />
            </MemoryRouter>)
        const btnText = screen.getByTestId('sortText');
        expect(btnText).toHaveTextContent('Relevance');
    });

    it('SortBtn toggle self state', () => {   
        render(
          <MemoryRouter>
            <SortBtn title="Relevance" toggler={toggler} onClick={() => {toggler = !toggler}} />
          </MemoryRouter>)
        const btn = screen.getByTestId('sortCont');
        userEvent.click(btn);
        expect(toggler).toBe(false);
        userEvent.click(btn);
        expect(toggler).toBe(true);
    });
})

describe("FilterBtn", () => {
  let toggler = false;
  let currentFilter = "Choose platform"
  it('Render button with right text', () => {  
      render(
          <MemoryRouter>
            <FilterBtn currentFilter={currentFilter} toggler={toggler} setCurrentFilter={jest.fn()} onClick={() => {toggler = !toggler}} />
          </MemoryRouter>)
      const btnText = screen.getByTestId('filterText');
      expect(btnText).toHaveTextContent("Choose platform");
  });

  it('FilterBtn open choose list', () => {   
      const {rerender} = render(
        <MemoryRouter>
          <FilterBtn currentFilter={currentFilter} toggler={toggler} setCurrentFilter={jest.fn()} onClick={() => {toggler = !toggler}} />
        </MemoryRouter>)
      const btn = screen.getByTestId('filterCont');
      const listCont = screen.getByTestId('listCont');
      userEvent.click(btn);
      rerender(
        <MemoryRouter>
          <FilterBtn currentFilter={currentFilter} toggler={toggler} setCurrentFilter={jest.fn()} onClick={() => {toggler = !toggler}} />
        </MemoryRouter>
      )
      expect(listCont.classList.contains('show')).toBe(true);
      userEvent.click(btn);
      rerender(
        <MemoryRouter>
          <FilterBtn currentFilter={currentFilter} toggler={toggler} setCurrentFilter={jest.fn()} onClick={() => {toggler = !toggler}} />
        </MemoryRouter>
      )
      expect(listCont.classList.contains('show')).toBe(false);
  });
})

