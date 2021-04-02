<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BigTypeRepository")
 */
class BigType
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titleKey;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Svg", inversedBy="bigType")
     */
    private $svg;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Creation", inversedBy="bigTypes")
     */
    private $creations;

    private $selected = true;

    public function __construct()
    {
        $this->creations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitleKey(): ?string
    {
        return $this->titleKey;
    }

    public function setTitleKey(string $titleKey): self
    {
        $this->titleKey = $titleKey;

        return $this;
    }

    public function getSvg(): Svg
    {
        return $this->svg;
    }

    public function setSvg(Svg $svg): self
    {
        $this->svg = $svg;

        return $this;
    }

    /**
     * @return Collection|Creation[]
     */
    public function getCreations(): Collection
    {
        return $this->creations;
    }

    public function addCreation(Creation $creation): self
    {
        if (!$this->creations->contains($creation)) {
            $this->creations[] = $creation;
        }

        return $this;
    }

    public function removeCreation(Creation $creation): self
    {
        if ($this->creations->contains($creation)) {
            $this->creations->removeElement($creation);
        }

        return $this;
    }

    /**
     * @return bool
     */
    public function isSelected(): bool
    {
        return $this->selected;
    }

    /**
     * @param bool $selected
     */
    public function setSelected(bool $selected): void
    {
        $this->selected = $selected;
    }
}
