import CustomList from "./CustomList.jsx";

function CharacterList({refreshKey, onSelectionChange, onDoubleClick}) {
    async function fetchCharacters() {
        const response = await fetch("http://localhost:8080/character/all")
        return await response.json()
    }

    return <CustomList
        requestFunction={fetchCharacters}
        hasImage={false}
        searchPlaceholder="Поиск персонажей..."
        refreshKey={refreshKey}
        onSelectionChange={onSelectionChange}
        onDoubleClick={onDoubleClick}
    />
}

export default CharacterList