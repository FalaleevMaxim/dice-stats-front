import CustomList from "./CustomList.jsx";

function CharacterList({refreshKey, onSelectionChange}) {
    async function fetchCharacters() {
        const response = await fetch("http://localhost:8080/character/all")
        return await response.json()
    }

    return <CustomList
        requestFunction={fetchCharacters}
        hasImage={false}
        refreshKey={refreshKey}
        onSelectionChange={onSelectionChange}
        searchPlaceholder="Поиск персонажей..."
    />
}

export default CharacterList