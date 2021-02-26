import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import createFutures from "../../../module";
import resource from "../shared/resource";
import UI from "./UI";
import {act} from "react-dom/test-utils";

let container = null;
const futures = createFutures();

describe(`UI`, () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe(`given no data is loaded`, () => {
    beforeEach(() => {
      jest.spyOn(resource, `asyncGetA`).mockImplementation(() => futures.predict(`asyncGetA`));
      jest.spyOn(resource, `asyncGetB`).mockImplementation(() => futures.predict(`asyncGetB`));
      act(() => {
        render(<UI/>, container)
      })
    });

    it(`displays a loading state`, () => {
      expect(findLoaderA()).toBeTruthy();
      expect(findLoaderB()).toBeTruthy();
      expect(findDataA()).toBeFalsy();
      expect(findDataB()).toBeFalsy();
      expect(findError()).toBeFalsy();
      expect(findAllDataLoaded()).toBeFalsy();
    });

    describe(`given data A loads`, () => {
      beforeEach(async () => {
        await act(() => futures.resolve(`asyncGetA`, "resultA"))
      });

      it(`displays A and a loader for B`, () => {
        expect(findLoaderA()).toBeFalsy();
        expect(findLoaderB()).toBeTruthy();
        expect(findDataA()).toBeTruthy();
        expect(findDataB()).toBeFalsy();
        expect(findError()).toBeFalsy();
        expect(findAllDataLoaded()).toBeFalsy();
      });

      describe(`given data B loads`, () => {
        beforeEach(async () => {
          await act(() => futures.resolve(`asyncGetB`, "resultB"))
        });

        it(`displays A,B and that all data are loaded`, () => {
          expect(findLoaderA()).toBeFalsy();
          expect(findLoaderB()).toBeFalsy();
          expect(findDataA()).toBeTruthy();
          expect(findDataB()).toBeTruthy();
          expect(findError()).toBeFalsy();
          expect(findAllDataLoaded()).toBeTruthy();
        });

      });

    });

    describe(`given A fails to load`, () => {

      beforeEach(async () => {
        await act(() => futures.reject(`asyncGetA`, "errorA").catch(() => undefined))
      });

      it(`displays an error`, () => {
        expect(findLoaderA()).toBeFalsy();
        expect(findLoaderB()).toBeFalsy();
        expect(findDataA()).toBeFalsy();
        expect(findDataB()).toBeFalsy();
        expect(findError()).toBeTruthy();
        expect(findAllDataLoaded()).toBeFalsy();
      });
    });

    describe(`given B fails to load`, () => {

      beforeEach(async () => {
        await act(() => futures.reject(`asyncGetB`, "errorB").catch(() => undefined))
      });

      it(`displays an error`, () => {
        expect(findLoaderA()).toBeFalsy();
        expect(findLoaderB()).toBeFalsy();
        expect(findDataA()).toBeFalsy();
        expect(findDataB()).toBeFalsy();
        expect(findError()).toBeTruthy();
        expect(findAllDataLoaded()).toBeFalsy();
      });
    });
  });
});

const findLoaderA = () => document.querySelector(`[data-test-id~="loader-a"]`);
const findLoaderB = () => document.querySelector(`[data-test-id~="loader-b"]`);
const findDataA = () => document.querySelector(`[data-test-id~="data-a"]`);
const findDataB = () => document.querySelector(`[data-test-id~="data-b"]`);
const findError = () => document.querySelector(`[data-test-id~="error"]`);
const findAllDataLoaded = () => document.querySelector(`[data-test-id~="all-data-loaded"]`);
