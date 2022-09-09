import React, { useState, useEffect } from 'react';
import { FilterCounter } from './FilterCounter';
import { SdgFilter } from './SdgFilter';
import { TypeFilter } from './TypeFilter';
import { StatusFilter } from './StatusFilter';

export function NewFilters({ nominees, displayNominees, setDisplayNominees }) {

  return (
    <div>
      <FilterCounter displayNominees={displayNominees} nominees={nominees} />
      <StatusFilter nominees={nominees} displayNominees={displayNominees} setDisplayNominees={setDisplayNominees} />
      <TypeFilter nominees={nominees} displayNominees={displayNominees} setDisplayNominees={setDisplayNominees} />
      <SdgFilter nominees={nominees} displayNominees={displayNominees} setDisplayNominees={setDisplayNominees} />
    </div>
  );
}