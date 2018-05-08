/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

import { findFunctionText } from "../function";

import { getSymbols } from "../../workers/parser/getSymbols";
import { getOriginalSource } from "../../workers/parser/tests/helpers";
import { setSource } from "../../workers/parser/sources";

describe("function", () => {
  describe("findFunctionText", () => {
    it("finds function", () => {
      const source = getOriginalSource("func");
      setSource(source);
      const symbols = getSymbols(source.id);
      const text = findFunctionText(14, source, symbols);
      expect(text).toMatchSnapshot();
    });

    it("finds function signature", () => {
      const source = getOriginalSource("func");
      setSource(source);
      const symbols = getSymbols(source.id);

      const text = findFunctionText(13, source, symbols);
      expect(text).toMatchSnapshot();
    });

    it("misses function closing brace", () => {
      const source = getOriginalSource("func");
      setSource(source);
      const symbols = getSymbols(source.id);

      const text = findFunctionText(15, source, symbols);

      // TODO: we should try and match the closing bracket.
      expect(text).toEqual(null);
    });

    it("finds property function", () => {
      const source = getOriginalSource("func");
      setSource(source);
      const symbols = getSymbols(source.id);

      const text = findFunctionText(35, source, symbols);
      expect(text).toMatchSnapshot();
    });

    it("finds class function", () => {
      const source = getOriginalSource("func");
      setSource(source);
      const symbols = getSymbols(source.id);

      const text = findFunctionText(39, source, symbols);
      expect(text).toMatchSnapshot();
    });

    it("cant find function", () => {
      const source = getOriginalSource("func");
      setSource(source);
      const symbols = getSymbols(source.id);

      const text = findFunctionText(20, source, symbols);
      expect(text).toEqual(null);
    });
  });
});
