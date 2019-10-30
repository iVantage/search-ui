import React from "react";
import MultiCheckboxFacet from "../MultiCheckboxFacet";
import { shallow } from "enzyme";

function getParams() {
  return {
    label: "A Facet",
    doFilterValuesMatch: jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true),
    onMoreClick: jest.fn(),
    onRemove: jest.fn(),
    onSelect: jest.fn(),
    onSearch: jest.fn(),
    options: [
      {
        value: "fieldValue1",
        count: 10
      },
      {
        value: "fieldValue2",
        count: 5
      }
    ],
    showMore: true,
    values: ["fieldValue2"]
  };
}

const rangeOptions = [
  {
    count: 1,
    value: {
      from: 1,
      to: 10,
      name: "The first option"
    }
  },
  {
    count: 11,
    value: {
      from: 11,
      to: 20,
      name: "The second option"
    }
  }
];

it("renders", () => {
  const wrapper = shallow(<MultiCheckboxFacet {...getParams()} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders range filters", () => {
  const wrapper = shallow(
    <MultiCheckboxFacet {...getParams()} option={rangeOptions} />
  );
  expect(wrapper).toMatchSnapshot();
});

it("will render 'more' button if more param is true", () => {
  const wrapper = shallow(
    <MultiCheckboxFacet
      {...{
        ...getParams(),
        showMore: true
      }}
    />
  );
  expect(wrapper.find(".sui-facet-view-more")).toHaveLength(1);
});

it("will render a no results message is no options are available", () => {
  const wrapper = shallow(
    <MultiCheckboxFacet
      {...{
        ...getParams(),
        options: []
      }}
    />
  );
  expect(wrapper.find(".sui-multi-checkbox-facet").text()).toEqual(
    "No matching options"
  );
});

it("won't render 'more' button if more param is false", () => {
  const wrapper = shallow(
    <MultiCheckboxFacet
      {...{
        ...getParams(),
        showMore: false
      }}
    />
  );
  expect(wrapper.find(".sui-multi-checkbox-facet__view-more")).toHaveLength(0);
});

describe("determining selected option from values", () => {
  it("will correctly determine which of the options is selected based on the provided value", () => {
    const wrapper = shallow(<MultiCheckboxFacet {...getParams()} />);
    expect(
      wrapper
        .find("input")
        .at(0)
        .prop("checked")
    ).toBe(false);

    expect(
      wrapper
        .find("input")
        .at(1)
        .prop("checked")
    ).toBe(true);
  });
});

it("renders with className prop applied", () => {
  const customClassName = "test-class";
  const wrapper = shallow(
    <MultiCheckboxFacet className={customClassName} {...getParams()} />
  );
  const { className } = wrapper.props();
  expect(className).toEqual("sui-facet test-class");
});

it("will render search input if `showSearch` param is true", () => {
  const wrapper = shallow(
    <MultiCheckboxFacet
      {...{
        ...getParams(),
        showSearch: true
      }}
    />
  );

  expect(wrapper.find(".sui-facet-search")).toHaveLength(1);
});

it("won't render search input if `showSearch` param is false", () => {
  const wrapper = shallow(
    <MultiCheckboxFacet
      {...{
        ...getParams(),
        showSearch: false
      }}
    />
  );

  expect(wrapper.find(".sui-facet-search")).toHaveLength(0);
});

it("should use the `searchPlaceholder` param as a search input placeholder", () => {
  const searchPlaceholder = "bingo";
  const wrapper = shallow(
    <MultiCheckboxFacet
      {...{
        ...getParams(),
        showSearch: true,
        searchPlaceholder
      }}
    />
  );

  expect(
    wrapper.find(".sui-facet-search__text-input").prop("placeholder")
  ).toBe(searchPlaceholder);
});
