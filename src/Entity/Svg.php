<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SvgRepository")
 */
class Svg
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $svgHtml;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titleKey;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Type", mappedBy="svgs")
     */
    private $types;

    public function __construct()
    {
        $this->types = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSvgHtml(): ?string
    {
        return $this->svgHtml;
    }

    public function setSvgHtml(string $svgHtml): self
    {
        $this->svgHtml = $svgHtml;

        return $this;
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

    /**
     * @return Collection|Type[]
     */
    public function getTypes(): Collection
    {
        return $this->types;
    }

    public function addType(Type $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types[] = $type;
            $type->addSvg($this);
        }

        return $this;
    }

    public function removeType(Type $type): self
    {
        if ($this->types->contains($type)) {
            $this->types->removeElement($type);
            $type->removeSvg($this);
        }

        return $this;
    }
}
