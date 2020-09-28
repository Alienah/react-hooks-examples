import {useState} from 'react';

function useList(init) {
  const [list, setList] = useState(init);
  return {
    list,
    removeItem(name) {
      const filteredList = list.filter((item) => item.name !== name);
      setList(filteredList);
    },
    saveItem(index, newVal) {
      const copyList = [...list];
      copyList[index].name = newVal;
      setList(copyList);

    }
  }
}

export default useList;